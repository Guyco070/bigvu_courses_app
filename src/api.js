import Axios from 'axios';

const username = "bigvu";
const password = "interview";

const get = async (header) => {
    return Axios.get(
        `/${header}`, 
        {
        auth: {
        username,
        password,
        },
    });
}

const getAllCourses = (setCurses) => {
    get(`list`)
    .then(async function (response) {
        const executeGettingCourseTask = async (tempCourse) => {
            return await get(tempCourse.id).then(response => response.data);
        }

        return await Promise.all(response.data.result.map(executeGettingCourseTask));
    })
    .then((allCourses) => {
        setCurses({
            data: allCourses,
            isLoading: false,
          });
    })
    .catch((error) => {
        console.log(error)
        setCurses({
            isLoading: false,
            data: null,
            error: true,
        })
    }); 
}

export default getAllCourses;
