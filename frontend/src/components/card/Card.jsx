import React, { useState } from "react";


export default function Card() {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <div className="card shadow p-3 mb-5 bg-body-tertiary rounded-4 mb-5" style={{ minWidth:"350px",maxWidth: "400px" }} >
        <img
          src="https://images.unsplash.com/photo-1481988535861-271139e06469?q=80&w=1190&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="card-img-top rounded-4"
          alt="..."
        />
        <div className="card-body">
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card’s content.ertdyfyugiuho fcgvhbjn cgvhbjn cgvhbn cvbh 
          </p>
        </div>
        <div className="d-flex gap-5 align-items-center">
          <div className="d-flex gap-2 ms-2">
            <i
              className={`bi ${liked ? "bi-heart-fill text-danger" : "bi-heart"}`}
              style={{ fontSize: "27px", cursor: "pointer" }}
              onClick={() => setLiked(!liked)}
            ></i>
            <p className="mt-2 text-xxl-end">50</p>
          </div>

          <div className="d-flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="size-6 mt-1"
              width={30}
              height={30}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            <p className="mt-1">40</p>
          </div>
        </div>
      </div>
    </>
  );
}
