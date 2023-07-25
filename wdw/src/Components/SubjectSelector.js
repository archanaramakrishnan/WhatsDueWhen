import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ClipboardIcon from 'react-clipboard-icon'
import Badge from '@material-ui/core/Badge';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from 'reactstrap';


function SubjectSelector(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
            margin: theme.spacing(5),
            },
        },
        shape: {
            backgroundColor: props.color,
            width: 25,
            height: 25,
        },
        shapeCircle: {
            borderRadius: '50%',
        },
        box: {
            display: "flex",
            alignItems: "center",
            float: "left"
        },
        copy: {
            height: "100px",
            width: "100px",
            display: "flex",
            alignItems: "center",
        }
        }));

    const classes = useStyles();
    const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;

    const [switchSel, setSwitchSel] = useState(true);
    const [copied, setCopied] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleChange = () => {
        let visibility = !switchSel;
        setSwitchSel(!switchSel);
        if (visibility)
        {
            console.log(`Course ${props.course} is visible`);
            props.addCourse(props.course);
        }
        else {
            console.log(`Course ${props.course} is NOT visible`);
            props.removeCourse(props.course);
        }

    }

    const onCopy = () => {
        setCopied(true);
    };
    
    const onShowAlert = ()=>{
        setVisible(true)
        window.setTimeout(()=>{
            setVisible(false)
          },3000)
    }

    return (
        <Card style={{ height: "170px" }}>
            <div style={{ padding: "25px", display: "flex", justifyContent: "space-between" }}>                
                <div className={clsx(classes.box)}>
                    <Badge color={props.color}>
                        {circle}
                    </Badge>
                    &nbsp;
                    {props.name}
                    
                </div>
                
                <div style={{ float: "left" }}>
                    <Switch checked={switchSel} color={"primary"} label={props.name} onChange={handleChange} />
                </div>

                
            </div>
            <div >
                {<CopyToClipboard
                        onCopy={onCopy}
                        text={props.permNum}>
                        <Button onClick={onShowAlert}  size="small" style={{marginLeft: "23px"}}>
                            <div >
                                {"Permission Number : " + props.permNum } 
                                &nbsp;
                                <ClipboardIcon
                                size={18}
                                style={{fill: '#3f50b5' }}
                                />
                            </div>
                        </Button>
                    </CopyToClipboard> }
                    <section className="section">
                        {copied ? 
                        <Alert color="primary" isOpen={visible} >
                            Permission number copied!
                        </Alert> : null}
                    </section>
            </div>
        </Card>
    );
}

export default SubjectSelector;