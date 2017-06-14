using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using new_crud_with_angular.Models;
using System.Collections;
using System.Data.Entity;

namespace new_crud_with_angular.api
{
    [RoutePrefix("api/Student")]
    public class StudentController : ApiController
    {
        private StudentDBEntities DBcontext;

        public StudentController()
        {
            DBcontext=new StudentDBEntities();
        }

        public HttpResponseMessage Savestudent(tblStudent student)
        {
            int result = 0;
            try
            {
                DBcontext.tblStudents.Add(student);
                DBcontext.SaveChanges();
                result = 1;
            }
            catch (Exception e)
            {
                result = 0;
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpGet]
        public List<tblStudent> GetStudents()
        {
            return DBcontext.tblStudents.ToList();
        }
        [Route("GetStudentByID/{studentID:int}")]
        [HttpGet]
        public tblStudent GetStudentByID(int studentId)
        {
            tblStudent student = DBcontext.tblStudents.Where(s => s.StudentID == studentId).SingleOrDefault();
            return student;
        }
        [HttpPut]
        public HttpResponseMessage UpdateStudent(tblStudent student)
        {
            int result = 0;   
            var oldStudent = DBcontext.tblStudents.Where(s => s.StudentID == student.StudentID).FirstOrDefault();
            oldStudent.FirstName = student.FirstName;
            oldStudent.LastName = student.LastName;
            oldStudent.Address = student.Address;
            oldStudent.Email = student.Email;
            DBcontext.Entry(oldStudent).State = EntityState.Modified;
            DBcontext.SaveChanges();
            result = 1;
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [Route("DeleteStudent/{studentID:int}")]
        [HttpDelete]
        public HttpResponseMessage DeleteStudent(int studentid)
        {
            int result = 0;
            var oldStudent = DBcontext.tblStudents.Where(s => s.StudentID == studentid).FirstOrDefault();
            DBcontext.Entry(oldStudent).State= EntityState.Deleted;
            DBcontext.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK,result);
        }

    }
}
