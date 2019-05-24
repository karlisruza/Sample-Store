import React from 'react';
import { Button, Form, Input, FormGroup, Modal, ModalBody } from 'reactstrap';
import Layout from '../../Components/Layout/Layout.js';
import Container from '../../Components/Layout/Container/Container.js';
import Dropzone from 'react-dropzone';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'
import uuid from 'uuid/v4';

import SampleCard from '../../Components/SampleUploadCard/SampleUploadCard.js';
import './UploadPack.scss';

const user_id = "ea7e866f-6005-46a6-9fa1-3a751a3de40c";

class Upload extends React.Component{
    constructor(props){
        super(props);
        this.state = {newSamples: [], files: [], formValues: {}, modal: false, redirect:false};
    }

    //fetches tags from db
    componentDidMount = () =>{
        const query = `{
            tags{
                tag_id
                name
            }
        }`;
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
    renderRedirect = () => {
        if (this.state.redirect) {
            let path = `pack/${this.state.newPackPath}`
            return <Redirect to={path} />
        }
    }

    //Removes file from file state and edits formValues object to represent the new order of values
    removeSampleCallback = (index) =>{
        const priceName = 'samplePrice';
        const bpmName = 'bpm';
        const keyName = 'key';
        const tagsName = 'sampleTags';
        const name = 'name';

        let newFormValues = this.state.formValues;
        //helper for removing formvalues for the deleted object
        for(let i = index; i < this.state.files.length; i++){
            if(i === index){
                if(newFormValues[priceName + i]) delete newFormValues[priceName + i];
                if(newFormValues[bpmName + i]) delete newFormValues[bpmName + i];
                if(newFormValues[keyName + i]) delete newFormValues[keyName + i];
                if(newFormValues[tagsName + i]) delete newFormValues[tagsName + i];
                if(newFormValues[name + i]) delete newFormValues[name + i];
            }
            else{
                if(newFormValues[priceName + i]){
                    newFormValues[priceName + (i-1)] = newFormValues[priceName + i];
                    delete newFormValues[priceName + i];
                }
                if(newFormValues[bpmName + i]){
                    newFormValues[bpmName + (i-1)] = newFormValues[bpmName + i];
                    delete newFormValues[bpmName + i];
                }
                if(newFormValues[keyName + i]){
                    newFormValues[keyName + (i-1)] = newFormValues[keyName + i];
                    delete newFormValues[keyName + i];
                }
                if(newFormValues[tagsName + i]){
                    newFormValues[tagsName + (i-1)] = newFormValues[tagsName + i];
                    delete newFormValues[tagsName + i];
                }
                if(newFormValues[name + i]){
                    newFormValues[name + (i-1)] = newFormValues[name + i];
                    delete newFormValues[name + i];
                }
            }
        }
        let newFiles = [...this.state.files];
        newFiles.splice(index, 1);
        this.setState({files: newFiles, formValues: newFormValues})
        console.log('dddd');
        console.log(this.state.formValues);
        console.log(this.state.files);
    }
    //maps form input values to state
    handleInputChange = (e) =>{
        let newFormData = this.state.formValues;
        newFormData[e.target.name] = e.target.value;
        this.setState({formValues: newFormData});
        console.log(this.state.formValues);
    }
    //handles pack tags input change
    handleSelectChange = (e) =>{
        let newFormData = this.state.formValues;
        newFormData['packTags'] = e;
        this.setState({formValues: newFormData});
    }
    //handles a samples tags input change
    handleSampleTagChange = (e, index)=>{
        let newFormData = this.state.formValues;
        const fieldName = 'sampleTags' + index;
        newFormData[fieldName] = e;
        this.setState({formValues: newFormData});
    }
    //handles a samples key change
    handleSampleKeyChange = (e, index)=>{ 
        let newFormData = this.state.formValues;
        const fieldName = 'key' + index;
        newFormData[fieldName] = e.value;
        this.setState({formValues: newFormData});
    }
    //clientside only
    handleFileUpload = (files) =>{
        let allFiles = [...this.state.files];
        allFiles = allFiles.concat(files);
        this.setState({files: allFiles});
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

    //Passes files to backend, which writes the files to GCS
    handleSubmit = async (e) =>{
        e.preventDefault();
        this.setState({modal: true});

        const filez = [...this.state.files];
        const { img, demo} = this.state;
        if(img && img.length > 0) filez.push(this.state.img[0]);
        if(demo && demo.length > 0) filez.push(this.state.demo[0]);

        for(let i = 0; i < filez.length; i++){
            const form = new FormData();
            form.append('files', filez[i]);

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

    //Called after all files have been uploaded to GCS, Inserts data into database
    databaseInsert = async() =>{
        const pack_id = uuid();
        this.setState({newPackPath: pack_id})
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

        //inserts pack entry in to packs
        await fetch('http://localhost:8080/graphql', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: addPackMutation,
            }),
          })
        .then( response => response.json() )
        .then( response => {});

        //Add samples
        const priceName = 'samplePrice';
        const bpmName = 'bpm';
        const keyName = 'key';
        const tagsName = 'sampleTags';
        const sampleName = 'name';

        let newSampleId = [];
        for(let i = 0; i < this.state.files.length; i++){
            const name = this.state.formValues[sampleName + i];
            const bpm = this.state.formValues[bpmName + i];
            const key = this.state.formValues[keyName + i];
            const price = this.state.formValues[priceName + i];

            const sample_id = uuid();
            newSampleId.push(sample_id);

            const addSampleMutation = `mutation {
                addSample(sample_id:"${sample_id}", name:"${name}", user_id: "${user_id}", price: ${price}, pack_id:"${pack_id}", sample_path: "${this.state.newSamples[i].path}", key:"${key}", bpm:${bpm}){
                sample_id
              }
            }`;

            await fetch('http://localhost:8080/graphql', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  query: addSampleMutation,
                }),
              })
            .then( response => response.json() )
            .then( response => {});
        }
        // Add all tags to a pack in db
        const packTags = this.state.formValues['packTags'];        
        for(let i = 0; i < packTags.length; i++){
            const packTagsMutation = `mutation {
                addPackTag(pack_id: "${pack_id}", tag_id: "${packTags[i].value}"){
                id
              }
            }`;
            await fetch('http://localhost:8080/graphql', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                query: packTagsMutation,
                }),
            })
            .then( response => response.json() )
            .then( response => {});
        }
        //Add all tags to all samples in db
        const { formValues } = this.state;
        for(let sampleCounter = 0; sampleCounter < this.state.files.length; sampleCounter++){
            const tagArray = formValues[tagsName+sampleCounter];
            for(let tagCounter = 0; tagCounter < tagArray.length; tagCounter++){
                const sampleTagsMutation = `mutation {
                    addSampleTag(sample_id: "${newSampleId[sampleCounter]}", tag_id: "${tagArray[tagCounter].value}"){
                    id
                  }
                }`;
                await fetch('http://localhost:8080/graphql', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                    query: sampleTagsMutation,
                    }),
                })
                .then( response => response.json() )
                .then( response => {});
            }
        }
        this.setState({redirect: true});
    }

    render(){
        if(!this.state.queryResults) return null;
        //create options for sample tags dropdown
        const { tags } = this.state.queryResults;
        let selectOptions = [];
        for(let i = 0; i < tags.length; i++){
            const option = { value: tags[i].tag_id, label: tags[i].name };
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
                    deleteCallback={this.removeSampleCallback}
                />
            );
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
                    <Modal isOpen={this.state.modal}>
                        <ModalBody>
                            {this.renderRedirect()}
                            <div className="ui active centered inline loader"></div>
                            <h3>We'll take you to your pack page, when it's up and running!</h3>
                        </ModalBody>   
                    </Modal>         
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
            </Layout>
        );
    }
}

export default Upload;