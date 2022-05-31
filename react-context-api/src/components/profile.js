import React, {useContext, useState} from "react";
import { AuthContext } from "../providers/auth";
import { useAuth } from "../providers/auth";

function Profile() {
    const {user} = useAuth();

    return(
        <div>
            <hr/>
            <h1>
                Profile
            </h1>
                {user.name}
        </div>
    )
}

export default Profile;