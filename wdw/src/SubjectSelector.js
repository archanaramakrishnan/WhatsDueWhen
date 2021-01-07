import React from 'react';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';

function SubjectSelector(name) {//add prop onClick={() => {state.checked = false;}}
    // const [state] = React.useState({
    //     checked: true,
    //   });
    return (
        <div style={{padding:"25px"}}>
            {name}
            <div style={{float:"right"}}>
                <Switch checked={true} color={"primary"} label={name} />
            </div>
        </div>
    );
}

export default SubjectSelector;