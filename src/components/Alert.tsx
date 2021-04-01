import React, { useRef, useState } from "react";
import { Toastr, ToastrRef, ToastrProps } from "@paljs/ui/Toastr";
import axios from "axios";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody } from "@paljs/ui/Card";
import { Button } from "@paljs/ui/Button";
import { Checkbox } from "@paljs/ui/Checkbox";
import { InputGroup } from "@paljs/ui/Input";
import Select from "@paljs/ui/Select";
import styled from "styled-components";
import { refreshToken } from "../components/NekrasovkaApiCaller";
import * as _ from "lodash";

const defaultToastrProps = {
  position: "topRight",
  status: "Primary",
  duration: 10000,
  hasIcon: true,
  destroyByClick: true,
  preventDuplicates: true,
};

const getExpirationDate = (jwtToken?: string): number | null => {
  if (!jwtToken) {
    return null;
  }

  const jwt = JSON.parse(atob(jwtToken.split(".")[1]));

  // multiply by 1000 to convert seconds into milliseconds
  return (jwt && jwt.exp && jwt.exp * 1000) || null;
};

const isExpired = (exp?: number) => {
  if (!exp) {
    return false;
  }

  return Date.now() > exp;
};

axios.interceptors.request.use((request) => {
  let token = localStorage.getItem("token");
  request.headers.Authorization = token ? `Bearer ${token}` : "";
  return request;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      if (isExpired(getExpirationDate(localStorage.getItem("token")))) {
        refreshToken().then((res) => {
          localStorage.setItem("token", res.data.token);
          error.config.headers["Authorization"] =
            "Bearer " + localStorage.getItem("token");
          error.config.baseURL = undefined;
          return axios.request(error.config);
        });
      }
    }
    return Promise.reject(error);
  }
);

export default function Alert() {
  const toastrRef = useRef<ToastrRef>(null);
  const toastrCountRef = useRef(0);

  const showToastr = (message, title, data) => {
    toastrRef.current?.add(message, title, { ...data });
    toastrCountRef.current = toastrCountRef.current + 1;
  };

  axios.interceptors.response.use(
    (response) => {
      if (response) {
        if (response.data) {
          if (response.data.msg) {
            showToastr(response.data.msg, "Success", {
              ...defaultToastrProps,
              status: "Success",
            });
          }
        }
      }
      return response;
    },
    (error) => {
      let message;
      if (error.response) {
        if (error.response.data.msg) {
          message = error.response.data.msg;
        } else {
          message = error.response.data;
        }
      } else {
        if (error.config) {
          message = `${error.config.method} request to url ${error.config.url} failed`;
        }
      }
      showToastr(message, error.message, {
        ...defaultToastrProps,
        status: "Danger",
      });
    }
  );

  return <Toastr ref={toastrRef} />;
}
