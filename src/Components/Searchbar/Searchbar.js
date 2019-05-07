import React from 'react';
import { Row, Badge, Form, FormGroup, Input } from 'reactstrap';

import s from './Searchbar.scss';

const mockDataTags = {
    tag1: "Techno",
    tag2: "House",
    tag3: "DnB",
    tag4: "Vocal",
    tag5: "Loops",
    tag6: "One-shots"
};

class Searchbar extends React.Component{ 
    render(){
        const tags = Object.values(mockDataTags);
        let badges = tags.map(tag =>
           <h5 className='filter_tags'><Badge color="secondary">{tag}</Badge></h5>
        );

        return(
            <Form>
                 <FormGroup>
                    <Input name="search" placeholder="Search for a name or keyword" />
                </FormGroup>
                <div className="tags_flex">
                    {badges}
                </div>
            </Form>
        );
    }
}

export default Searchbar;