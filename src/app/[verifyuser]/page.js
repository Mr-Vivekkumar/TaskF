// app/[param]/page.js

"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
const ParamPage = () => {
    const params = useParams();
    const [data,setData] = useState("")
    const param = params.verifyuser; 
    useEffect(() => {
        if (param) {
            const registerUserQuery = {
                query: `
                mutation($verifytoken: String!){
                    verifyUser(verifytoken: $verifytoken)
                  }
                `,
                variables: {
                verifytoken: param
                }
              };
            axios.post(
                'http://localhost:4000/graphql',
                registerUserQuery,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(response => {
                    if (response?.data?.data?.verifyUser) {
                        setData(response?.data?.data?.verifyUser)
                        setTimeout(() => {
                            window.location.replace("/")
                        },3000)
                    }
                })
                .catch(error => {
                    console.log(error, "response")
                });
        }
    }, [param])
    return (
        <div>
            <h1>{data}</h1>
        </div>
    );
};

export default ParamPage;
