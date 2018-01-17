import * as React from "react";
import Input, { InputAdornment } from "material-ui/Input";
import IconButton from "material-ui/IconButton/IconButton";
import { Close } from "material-ui-icons";

export interface EditFieldProps {
    defaultValue: string;
}
export default class EditField extends React.Component<EditFieldProps> {
    render() {
        return (
            <Input
                defaultValue={this.props.defaultValue}
                // onChange={(e) => this.renamePreset(preset)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={() => {}}>
                            <Close />
                        </IconButton>
                    </InputAdornment>
                }
            />
        );
    }
}