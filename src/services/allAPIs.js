import commonAPI from "./commonAPI";
import SERVERURL from "./serverURL";

// registerAPI 
export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/register`,reqBody)
}

// login
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/login`,reqBody)
}

// add
export const addAPI = async (reqBody,token)=>{
    return await commonAPI("POST",`${SERVERURL}/add`,reqBody,{headers:{Authorization:`Bearer ${token}`}})
}

// get 
export const getAPI = async ()=>{
    return await commonAPI("GET",`${SERVERURL}/questions`,null)
}

//remove question
export const deleteQuestionAPI = async(id,token)=>{
  return await commonAPI("DELETE",`${SERVERURL}/questions/${id}/delete`,null,{headers:{Authorization:`Bearer ${token}`}})
}


// edit
// export const editAPI = async (id,reqBody)=>{
//     return await commonAPI("PUT",`${SERVERURL}/questions/${id}/edit`,reqBody)
// }

// delete
// export const deleteAPI = async (id,token)=>{
//     return await commonAPI("DELETE",`${SERVERURL}/${id}/delete`)
// }

export const addCommentAPI = async (reqBody,token)=>{
    return await commonAPI("POST",`${SERVERURL}/addComment`,reqBody,{headers:{Authorization:`Bearer ${token}`}})
}

export const getCommentAPI = async (questionId) => {
    return await commonAPI( "GET", `${SERVERURL}/getComment?questionId=${questionId}`, "")
  }
  export const editCommentAPI = async(id,reqBody,token)=>{
    return await commonAPI("PUT",`${SERVERURL}/comment/${id}/edit`,reqBody,{headers:{Authorization:`Bearer ${token}`}})
  }
  export const deleteCommentAPI = async(id,token)=>{
    return await commonAPI("DELETE",`${SERVERURL}/comment/${id}/delete`,{headers:{Authorization:`Bearer ${token}`}})
  }

  // export const quizStatus = async(id)=>{
  //   return await commonAPI("GET",`${SERVERURL}/quizStatus/${id}`,{headers:{Authorization:`Bearer ${token}`}})
  // }

  export const quizResult = async (userId, score, token) => {
  return await commonAPI("POST", `${SERVERURL}/submit-quiz`, 
    {  score,userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

  