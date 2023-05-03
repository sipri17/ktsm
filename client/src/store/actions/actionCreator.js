import baseUrl from '../../utilities/baseUrl'



export function fetchFiles() {
    return async (dispatch, getState) => {
        try {

            const res = await fetch(`${baseUrl}/files`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    access_token: localStorage.access_token
                },
            })
            if (!res.ok) {
                throw await res.json()
            }
            const data = await res.json()
            dispatch({
                type: "files/fetchSuccess",
                payload: data.files
            })
            
            
        } catch (error) {
            console.error(error)
        }
    
    }
}

export function loginHandler(input) {
    return async (dispatch, getState) => {
        try {
            const res = await fetch(`${baseUrl}/login`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input)
            })

            const data = await res.json()

            if (!res.ok) {
                throw data
            }

            localStorage.setItem('access_token', data.access_token) 
            localStorage.setItem('fullName', data.fullName) 
            localStorage.setItem('role', data.role) 

            
        } catch (error) {
            console.log(error)
        } 
    }
}








