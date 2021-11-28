const baseURL = process.env.REACT_APP_BASE_URL;
const cloudinaryName = process.env.REACT_APP_CLOUDINARY_NAME;

export default {
    register: `${baseURL}/users/sign_up`,
    login: `${baseURL}/users/login`,
    logout: `${baseURL}/users/logout`,
    getUserById: (userId) => `${baseURL}/users/${userId}`,
    location: 'https://api.pace.africa/v1/locations',
    getAllUsers: `${baseURL}/users`,
    getAllUsersByRole: (role) => `${baseURL}/users/admin/${role}`,
    getUploadsByUserId: (userId, page = 1, analyzed) =>
        `${baseURL}/upload/users/${userId}?page=${page}&analyzed=${analyzed}`,
    getUploadById: (uploadId) => `${baseURL}/upload/${uploadId}`,
    postUpload: `${baseURL}/upload/update-link`,
    deleteVideo: (videoId) => `${baseURL}/upload/${videoId}`,
    deleteUserById: (userId) => `${baseURL}/users/${userId}`,
    createClub: `${baseURL}/club`,
    createCoAdmin: `${baseURL}/users/co-admin`,
    getAllCoach: `${baseURL}/users/coach`,
    cloudinaryPost: `https://api.cloudinary.com/v1_1/${cloudinaryName}/upload`,
    getAllClub: (status) => `${baseURL}/club/all-club?status=${status}`,
    clubUpdate: (club_id) => `${baseURL}/club/${club_id}`,
    getClubsByCoachId: (coachId, status) =>
        `${baseURL}/club/coach/${coachId}?staus=${status}`,
    getS3ImgLink: `${baseURL}/club/presigned-img-url`,
    csvUpload: `${baseURL}/player/csv-upload`,
};
