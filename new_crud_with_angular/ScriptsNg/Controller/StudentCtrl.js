app.controller('studentCtrl', ['$scope', 'CrudService',
    function ($scope, CrudService) {
        var baseurl = 'http://localhost:2509/api/Student/';
        $scope.btntext = "Save";
        //$scope.studentID = 0;
        $scope.SaveUpdate = function() {
            var student = {
                FirstName: $scope.firstName,
                LastName: $scope.lastName,
                Email: $scope.email,
                Address: $scope.address,
                StudentID: $scope.studentID
            }
            debugger;
            if ($scope.btntext == "Save") {
                var apiRoute = baseurl + 'Savestudent/';
                debugger;
                var savestudent = CrudService.post(apiRoute, student);
                savestudent.then(function (response) {
                    if (response.data != "") {
                            alert("Data Saved Successfully");
                            $scope.clear();

                        } else {
                            alert("Some Erorr-----");
                        }

                    },
                    function(erorr) {
                        console.log("erorr: " + erorr);
                    });
            } else {
                var apiRoute = baseurl + 'UpdateStudent/';
                var UpdateStudent = CrudService.put(apiRoute, student);
                debugger;
                UpdateStudent.then(function (response) {
                    if (response.data != "") {
                        alert("Data Updated Succefully");
                        $scope.GetStudents();
                        $scope.clear();
                    } else {
                        alert("Some Erorr");
                    }

                },
                    function(erorr) {
                        console.log("Erorr: "+error);
                    });
            }
        }
        $scope.GetStudents = function() {
                var apiRoute = baseurl + 'GetStudents/';
                var student = CrudService.getAll(apiRoute);
                student.then(function(response) {
                        $scope.students = response.data;
                    },
                    function(erorr) {
                        console.log("Erorr: " + erorr);
                    });
            }
            $scope.GetStudents();
            $scope.GetStudentByID = function (dataModel) {
                var apiRout = baseurl + 'GetStudentByID';
                var student = CrudService.getbyID(apiRout, dataModel.StudentID);
                student.then(function(response) {
                    $scope.studentID = response.data.StudentID;
                    $scope.firstName = response.data.FirstName;
                    $scope.lastName = response.data.LastName;
                    $scope.email= response.data.Email;
                    $scope.address = response.data.Address;
                    $scope.btntext = "Update";
              
                    },
                    function(erorr) {
                        console.log("Erorr : " + erorr);
                    }
                );


            }
        $scope.DeleteStudent= function(dataModel) {
            var apiRoute = baseurl + 'DeleteStudent/' + dataModel.StudentID;
            var deletestudent = CrudService.delete(apiRoute);
            alert('Data Deleted');
            $scope.GetStudents();
            $scope.clear();
        }
       

        $scope.clear = function () {
            $scope.studentID = 0;
            $scope.firstName = "";
            $scope.lastName = "";
            $scope.email = "";
            $scope.address = "";

        }
    }
]);