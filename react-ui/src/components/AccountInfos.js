import React from "react";

function AccountInfos({ user }) {
    return (
        <div className="row my-4">
            <div className="col col-md-6">
                <div className="card">
                    <div className="card-header">Mon compte</div>
                    <div className="card-body text-secondary">
                        <h5 className="card-title">{user.firstname} {user.lastname}</h5>
                        <p className="card-text">
                            {user.email}
                            {user.phone ? user.phone : null}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountInfos
