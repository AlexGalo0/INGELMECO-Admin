
interface alertProps {
    type: string;
    message: string;
    message2?: string;
    svg: React.ReactNode;
}

export function Alerts({type, message, message2,svg}: alertProps) {

    return (
        <div className={`alert ${type} alert-white rounded`}>
            <div className="icon d-flex justify-content-center align-items-center">
                {svg}
            </div>
            <strong>¡{message}!</strong> {message2}
        </div>
    );
}