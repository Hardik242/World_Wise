import {useNavigate} from "react-router-dom";
import Button from "./Button";

export default function BackButton() {
    const navigate = useNavigate();

    return (
        <div>
            <Button
                onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                }}
                type="back">
                &larr; Back
            </Button>
        </div>
    );
}
