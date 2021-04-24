import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';

function SubjectSelector(props) {

    const [switchSel, setSwitchSel] = useState(true);

    const handleChange = () => {
        setSwitchSel(!switchSel)
    }

    return (
        <Card style={{ height: "120px" }}>
            <div style={{ padding: "25px", display: "flex", justifyContent: "space-between" }}>
                <Box bgcolor={props.color} p={2} />
                
                <div style={{ float: "left" }}>
                    {props.name}
                    <div style={{ fontSize: "9pt" }}>
                        {"Permission Number : " + props.permNum}
                    </div>
                    {/* <Button variant="outlined" size="small">
                        Add Event
                    </Button> */}
                </div>
                <div style={{ float: "left" }}>
                    <Switch checked={switchSel} color={"primary"} label={props.name} onChange={handleChange} />
                </div>
            </div>
        </Card>
    );
}

export default SubjectSelector;