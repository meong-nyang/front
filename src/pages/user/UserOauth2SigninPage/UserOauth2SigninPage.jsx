import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { instance } from '../../../apis/util/instance';

function UserOauth2SigninPage(props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    useEffect(() => {
        localStorage.setItem("accessToken", "Bearer " + searchParams.get("accessToken"));
        instance.interceptors.request.use(config => {
            config.headers["Authorization"] = localStorage.getItem("accessToken");
            return config;
        });    
        navigate("/"); 
    }, []);
    
    return (
        <div>
            
        </div>
    );
}

export default UserOauth2SigninPage;