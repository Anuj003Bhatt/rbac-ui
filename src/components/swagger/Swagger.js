import React from "react";
import { SERVICES } from "../../utilities/Constants";

const Swagger = () => {
    return (
        <iframe
            title="Swagger UI"
            allowFullScreen='true'
            width='100%'
            height='100vh'
            style={{height: '100vh'}}
            src={`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/swagger-ui/index.html`} 
        />
    );
}

export default Swagger;