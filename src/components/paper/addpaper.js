import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class AddPaper extends Component {
    render() {
        return (
            <div>
                <h1>Add Paper</h1>
                <h3>Choose from the follow options:</h3>
                <Link to="/addmanual">Add Paper Manually</Link>
                <br></br>
                <br></br>
                <Link to="/addbibtex">Add Paper using Bibtex</Link>

            </div>
        );
    }
}

export default AddPaper;