import React from 'react';
import { Button, Form, Input, FormGroup } from 'reactstrap';
import Layout from '../../Components/Layout/Layout.js'
import Container from '../../Components/Layout/Container/Container.js';
import Dropzone from 'react-dropzone'
import Select from 'react-select';
import uuid from 'uuid/v4';

import SampleCard from '../../Components/SampleUploadCard/SampleUploadCard.js';
import './UploadPack.scss';

const user_id = "ea7e866f-6005-46a6-9fa1-3a751a3de40c";

class Upload extends React.Component{
    constructor(props){
        super(props);
        this.state = {newSamples: [], files: [], formValues: {}};
    }

    componentDidMount = () =>{
        const query = `{
            tags{
                name
            }
        }`
        fetch('http://localhost:8080/graphql', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: query,
            }),
          })
          .then( response => response.json() )
          .then( response => this.setState({queryResults: response.data} ) );
    }

    //maps form input values to state
    handleInputChange = (e) =>{
        let newFormData = this.state.formValues;
        newFormData[e.target.name] = e.target.value;
        this.setState({formValues: newFormData});
        console.log(this.state.formValues);
    }
    handleSelectChange = (e) =>{
        let newFormData = this.state.formValues;
        newFormData['packTags'] = e;
        this.setState({formValues: newFormData});
    }
    handleSampleTagChange = (e, index)=>{
        let newFormData = this.state.formValues;
        const fieldName = 'sampleTags' + index;
        newFormData[fieldName] = e;
        this.setState({formValues: newFormData});
    }
    handleSampleKeyChange = (e, index)=>{ 
        let newFormData = this.state.formValues;
        const fieldName = 'key' + index;
        newFormData[fieldName] = e.value;
        this.setState({formValues: newFormData});
    }
    //clientside only
    handleFileUpload = (files) =>{
        let allFiles = [...this.state.files];
        console.log(this.state.files);

        allFiles = allFiles.concat(files);
        console.log("allfiles", allFiles);
        this.setState({files: allFiles});
        console.log(this.state.files);
    }
    //clientside only
    handleImgUpload = (files) =>{
        if(files.length > 1) alert('Choose a single image file');
        else this.setState({img: files});     
    }
    //clientside only
    handleDemoUpload = (files) =>{
        if(files.length > 1) alert('Choose a single demo file');
        else this.setState({demo: files});  
    }


    handleSubmit = async (e) =>{
        e.preventDefault();
        console.log('handlesubmit1');
        console.log(this.state.files);
        const filez = [...this.state.files];
        console.log('handlesubmit2');
        const { img, demo} = this.state;
        console.log(this.state.files);
        if(img && img.length > 0) filez.push(this.state.img[0]);
        if(demo && demo.length > 0) filez.push(this.state.demo[0]);
        console.log('handlesubmit3');
        console.log(this.state.files);
        console.log('aaa');
        // return;

        for(let i = 0; i < filez.length; i++){
            const form = new FormData();
            form.append('files', filez[i]);

            // let promise = new Promise(resolve =>{
            //     console.log('resolved');
            // });

            await fetch('http://localhost:8080/uploadpack', {
                method: "POST",
                body: form,
                form: true
            })
            .then( response => response.json() )
            .then( response => {
                console.log(response.data);
 
                if(i < filez.length - 2 && filez.length > 2){
                    let newArray = this.state.newSamples;
                    newArray.push(response.data);
                    this.setState({newSamples: newArray});
                }
                else if(i === filez.length - 2){
                    this.setState({img_info: response.data});
                }
                else if(i === filez.length - 1) {
                    this.setState({demo_info: response.data});
                    this.databaseInsert();
                    console.log(this.state.files);
                }
            })
            // await promise;
        }
    }

    databaseInsert = () =>{
        const addSampleMutation = `mutation {
            addSample(name: "testsample", user_id: "ea7e866f-6005-46a6-9fa1-3a751a3de40c", price: 100, pack_id:"ea7e866f-6005-46a6-9fa1-3a751a3de41d", sample_path: "aa", key:"A", bpm:120){
            sample_id
          }
        }`;
        const packTagsMutations = `mutation {
            addPackTag(pack_id: "ea8e866f-6005-46a6-9fa1-3a751a3de41d", tag_id: "ea7e866f-6005-46a9-9fa1-4a751a3de42a"){
            id
          }
        }`;
        const sampleTagsMutations = `mutation {
            addSampleTag(sample_id: "ea8e866f-6005-46a6-9fa1-3a751a3de41d", tag_id: "ea7e866f-6005-46a9-9fa1-4a751a3de42a"){
            id
          }
        }`;
        /////////////////////////
        const pack_id = uuid();
        const community = false;
        const demo_path = this.state.demo_info.path;
        const { packName, packPrice, packDescription } = this.state.formValues;
        const imgPath = this.state.img_info.path;

        const addPackMutation = `mutation {
            addPack(
                pack_id: "${pack_id}", community: ${community},
                name: "${packName}", user_id: "${user_id}",
                price: ${packPrice}, demo_path: "${demo_path}",
                description:"${packDescription}", img_path: "${imgPath}")
            {
                pack_id
            }
        }`;

        console.log('db insert f()');


        fetch('http://localhost:8080/graphql', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: addPackMutation,
            }),
          })
          .then( response => response.json() )
          .then( response => {
                console.log('pack added');
                console.log(this.state.files);
            });

    }

    render(){
        if(!this.state.queryResults) return null;
        //create options for sample tags dropdown
        const { tags } = this.state.queryResults;
        let selectOptions = [];
        for(let i = 0; i < tags.length; i++){
            const option = { value: tags[i].name, label: tags[i].name };
            selectOptions.push(option);
        }
        
        //creates samplecards for each file
        let samplelist;
        if(this.state.files.length > 0){
            samplelist = this.state.files.map((file, index) =>
                <SampleCard 
                    key={index} 
                    title={file.name} 
                    options={selectOptions} 
                    index={index} 
                    callback={this.handleInputChange} 
                    tagsCallback={this.handleSampleTagChange}
                    keyCallback={this.handleSampleKeyChange}
                />
            )
        }
        //creates displayable image, if one has been uploaded
        let imgData;
        if(this.state.img){
            const img = this.state.img[0];
            var reader  = new FileReader();
            reader.onload = function(e)  {
                imgData = e.target.result;
             }
             reader.readAsDataURL(img);
        }
        //creates demo data
        let demoData
        if(this.state.demo){
            const audio = this.state.demo[0];
            var reader  = new FileReader();
            reader.onload = function(e)  {
                demoData = e.target.result;
             }
             reader.readAsDataURL(audio);
        }

        return (
            <Layout>
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                         <Dropzone name='image' onDrop={acceptedFiles => this.handleImgUpload(acceptedFiles)}>
                            {({getRootProps, getInputProps}) => (
                                <section className='dropzone__img'>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {imgData ? (<img src={imgData} alt='Whoops, something went wrong' />) : (<p>Drag 'n' drop some files here, or click to select files</p>)}
                                </div>
                                </section>
                            )}
                        </Dropzone>
                        <Dropzone name='demo' onDrop={acceptedFiles => this.handleDemoUpload(acceptedFiles)}>
                            {({getRootProps, getInputProps}) => (
                                <section className='dropzone__img'>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {demoData ? (<audio controls src={demoData} alt='Whoops, something went wrong' />) : (<p>Choose a demo for your pack!</p>)}
                                </div>
                                </section>
                            )}
                        </Dropzone>
                        <FormGroup>
                            <span>Pack Name</span>
                            <Input placeholder='Name your pack' name='packName' type='text' onChange={this.handleInputChange}/>
                        </FormGroup>
                        <FormGroup>
                            <span>Description</span>
                            <Input placeholder='Say a few words about these sounds' name='packDescription' type='text' onChange={this.handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <span>Tags</span>
                            <Select placeholder='Choose some tags for the pack' isMulti={true} options={selectOptions} onChange={this.handleSelectChange} />
                        </FormGroup>
                        <FormGroup>
                            <span>Pack price</span>
                            <Input placeholder="Amount in coins" min={0} type="number" step="1" name='packPrice' onChange={this.handleInputChange} />
                        </FormGroup>
                        <Dropzone name='files' onDrop={acceptedFiles => this.handleFileUpload(acceptedFiles)}>
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

                        <span>Upload demo</span>
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