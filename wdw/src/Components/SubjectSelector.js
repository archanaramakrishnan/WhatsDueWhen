import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ClipboardIcon from 'react-clipboard-icon'

function SubjectSelector(props) {

    const [switchSel, setSwitchSel] = useState(true);
    const [copied, setCopied] = useState(false);

    const handleChange = () => {
        setSwitchSel(!switchSel)
    }

    const onCopy = () => {
        setCopied(true);
      };

    const onClick = ({target: {innerHTML}}) => {
        // <Alert severity="success">Permission number copied to the clipboard!</Alert>
        console.log(`Clicked on "${innerHTML}"!`); // eslint-disable-line
      };

    return (
        <Card style={{ height: "120px" }}>
            <div style={{ padding: "25px", display: "flex", justifyContent: "space-between" }}>
                <Box bgcolor={props.color} p={2} />
                
                <div style={{ float: "left" }}>
                    {props.name}
                    {<CopyToClipboard
                        onCopy={onCopy}
                        text={props.permNum}>
                        {/* {"\n"} */}
                        <Button onClick={onClick} variant="outlined" size="small">
                            <div style={{ fontSize: "9pt" }}>
                                {"Permission Number : " + props.permNum } 
                                &nbsp;
                            </div>
                            <div>
                                <ClipboardIcon
                                size={20}
                                style={{fill: '#3f50b5' }}
                                />
                            </div>
                        </Button> 
                    </CopyToClipboard> }
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