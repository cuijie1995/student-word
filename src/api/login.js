import request from '@/utils/request'


export function login(data) {
  return request({
    url: '/api/TokenAuth/Authenticate',
    method: 'post',
    data
  })
}



export function lesson(data) {
  return request({
    url: '/api/services/app/Subject/GetAllSubject',
    method: 'get',
    params: data
  })
}


export function title(data) {
  return request({
    url: '/api/services/app/ExaminationContent/GetForEdit',
    method: 'get',
    params: data
  })
}

export function error(data) {
  return request({
    url: '/api/services/app/ExaminationContent/GetForErrorEdit',
    method: 'get',
    params: data
  })
}


export function create(data) {
  return request({
    url: '/api/services/app/ExaminationContent/Create',
    method: 'post',
    data
  })
}




export function get(data) {
  return request({
    url: '/api/services/app/CourseUnit/GetAllCourseUnit',
    method: 'get',
    data
  })
}



export function update(data) {
  return request({
    url: '/api/services/app/CourseUnit/UpdateCourseUnit',
    method: 'put',
    headers: { 'content-type': 'application/json' },
    data
  })
}