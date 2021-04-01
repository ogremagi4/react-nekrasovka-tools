import React, {useState} from 'react';
import { postFileForEds } from '../components/NekrasovkaApiCaller'
import fileDownload from 'js-file-download'
import { Button, ButtonLink } from "@paljs/ui/Button";


function Eds(){
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
		const formData = new FormData();

		formData.append('file', selectedFile);
		formData.append('t', new Date().getTime())
        postFileForEds(formData).then(response =>  {
			fileDownload(response.data, 'report.pdf');
		 })
		 .catch(error => console.log(error));
				
	};

	return (
            <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<Button appearance="hero" status="Warning" onClick={handleSubmission} disabled={!isFilePicked}>
          		Create eds
			</Button>
		</div>
	)
}
export default Eds