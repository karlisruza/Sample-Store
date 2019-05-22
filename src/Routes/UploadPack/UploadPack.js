import React from 'react';
import { Button, Form, Input, FormGroup } from 'reactstrap';
import Layout from '../../Components/Layout/Layout.js'
import Container from '../../Components/Layout/Container/Container.js';
import AudioPlayer from "react-h5-audio-player";
import Dropzone from 'react-dropzone'

import SampleCard from '../../Components/SampleUploadCard/SampleUploadCard.js';
import './UploadPack.scss';

class Upload extends React.Component{
    constructor(props){
        super(props);
        this.state = {newSampleId: [], files: []};
    }
    
    handleClick = () =>{
        console.log('click');
        const filepath='/home/kr/Downloads/electric piano 90bpm.mp3';
        fetch('http://localhost:8080/uploadpack', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              filepath: filepath,
            }),
          })
          .then( response => response.json() )
          .then( response => {
              console.log("passed to backend");
            });
        }
    
    handleDl = () =>{
        const filepath='electric piano 90bpm.mp3';
        fetch(`https://www.googleapis.com/storage/v1/b/sample__shop/o/${filepath}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })
          .then( response => response.json() )
          .then( response => {
                console.log('dl');
            });
        }
    
    handleUpload = (files) =>{
        let allFiles = this.state.files.concat(files);
        this.setState({files: allFiles});
        this.setState({fileCount: allFiles.length});
    }

    handleSubmit = () =>{
        // console.log(files)
        // for(let i = 0; i < files.length; i++){
        //     const form = new FormData();
        //     form.append('files', files[0]);

        //     fetch('http://localhost:8080/uploadpack', {
        //         method: "POST",
        //         body: form,
        //         form: true
        //     })
        //     .then( response => response.json() )
        //     .then( response => {
        //         console.log(response.data.id);
        //         const newArray = this.state.newSampleId;
        //         newArray.push(response.data.id);
        //         this.setState({newSampleId: newArray});
        //     });
        // }
    }

    render(){

        let samplelist;
        if(this.state.files.length > 0){
            samplelist = this.state.files.map(file =>
                <SampleCard title={file.name}/>
            )
        }

        return (
            <Layout>
                <Container>
                    <Form>
                        <FormGroup>
                            <span>Pack Name</span>
                            <Input name='packName' type='text' />
                        </FormGroup>
                        <FormGroup>
                            <span>Description</span>
                            <Input name='packDescription' type='text' />
                        </FormGroup>
                        <FormGroup>
                            <span>Price</span>
                            <Input name='packName' type='text' />
                        </FormGroup>
                        {/* <FilePond server="http://localhost:8080/uploadpack"/>  */}
                        <Dropzone name='files' onDrop={acceptedFiles => this.handleUpload(acceptedFiles)}>
                            {({getRootProps, getInputProps}) => (
                                <section className='dropzone'>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                                </section>
                            )}
                        </Dropzone>
                        {samplelist}


                        <span>Tags</span>
                        <br />
                        <span>Upload demo</span>
                        <br />
                        <span>Upload samples</span>
                        <br />
                        <span>Sample tags</span>
                        <br />
                        <span>Sample price</span>
                        <br />
                        <span>Sample key</span>
                        <br />
                        <span>Sample Bpm</span>
                        <br />
                        <span>Pack image</span>
                        <br />
                        <Button type='submit' color='primary'>Publish the pack!</Button>
                    </Form>
                </Container>
                {/* <Button onClick={this.handleClick}>Upload</Button>
                <Button onClick={this.handleDl}>Download</Button>
                <a href='https://www.googleapis.com/download/storage/v1/b/sample__shop/o/electric%20piano%2090bpm.mp3?generation=1558346428233155&alt=media'> download </a>
                <audio
                    controls
                    src="https://www.googleapis.com/download/storage/v1/b/sample__shop/o/electric%20piano%2090bpm.mp3?generation=1558346428233155&alt=media">
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
                {/* <AudioPlayer
                    autoPlay
                    src="https://www.googleapis.com/download/storage/v1/b/sample__shop/o/electric%20piano%2090bpm.mp3?generation=1558346428233155&alt=media"
                    onPlay={e => console.log("onPlay")}
                    // other props here
                /> */} */}
            </Layout>
        );
    }
}

export default Upload;