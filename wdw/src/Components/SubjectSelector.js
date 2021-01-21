import React from 'react';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';

// export const SubjectSelector = props => {
//     const [state, setState] = React.useState(true);

//     return (
//         <div style={{ padding: "25px" }}>
//             {props.name}
//             <div style={{ float: "right" }}>
//                 <Switch onChange={setState(!state)} checked={state} color={"primary"} label={props.name} />
//             </div>
//         </div>
//     );
// }

// export default SubjectSelector;

function SubjectSelector(name) {//add prop onClick={() => {state.checked = false;}}
    // const [state] = React.useState({
    //     checked: true,
    //   });
    return (
        <div style={{ padding: "25px" }}>
            {name}
            <div style={{ float: "right" }}>
                <Switch checked={true} color={"primary"} label={name} />
            </div>
        </div>
    );
}

export default SubjectSelector;