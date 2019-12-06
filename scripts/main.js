// initialize the tool-tip plugin for Bootstrap4
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})


$.ajax({
  url: "data/cohort.json"
}).done(cohortMembers)
  .fail(function (error) {
    console.log("error", error);
  });

function cohortMembers(list) {
  let data = list.cohort.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1);
  data.forEach(function (item) {
    let studentContact = `<div class="studentContact">`
    //if student doesn't have a portfolio site then don't display the icon
    if (item.portfolio != "") {

      studentContact += `<a href=${item.portfolio} target="_blank">
      <i class="fas fa-globe fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have a github site then don't display the icon
    if (item.github != "https://github.com/") {

      studentContact += `<a href=${item.github} target="_blank">
      <i class="fab fa-github fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have a linkedin site then don't display the icon
    if (item.linkedIn != "https://www.linkedin.com/in/") {

      studentContact += `<a href=${item.linkedIn} target="_blank">
      <i class="fab fa-linkedin fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have an email then don't display the icon
    if (item.email != "") {

      studentContact += `<a href=mailto:${item.email}>
              <i class="fas fa-envelope fa-2x contactIcons"></i>
            </a>`
    }
    studentContact += `</div>`

    let studentInfo = `<div class="col-md-3 cohortMems">
          <img class="card-img-top" src="images/classmates/${item.proImg}" alt="${item.firstName} ${item.lastName}" data-toggle="modal" data-target="#cohortMember${item.id}" style="cursor:pointer;">
          <div class="card-body">
            <h4 class="card-title title-font">${item.firstName} ${item.lastName}</h4>`
    //if student didn't provide a reelthemin quote then nothing is displayed
    if (item.reelThemIn != null) {
      studentInfo += `<p class="card-text">${item.reelThemIn}</p>`
    }
    studentInfo += studentContact

    //if a student doesn't have a bio, then the learn more button doesn't appear and a modal isn't created
    if(item.bio != "<p></p>"){

    studentInfo += `
            <center><button type="button" class="btn btn-outline-primary title-font bottom" data-toggle="modal" data-target="#cohortMember${item.id}">
           Learn More!
          </button></center>
          </div>
        </div>`
    //modal info
    studentInfo +=`
<div class="modal fade" id="cohortMember${item.id}" tabindex="-1" role="dialog" aria-labelledby="cohortMember${item.id}Label" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="container-fluid">
                <div class="row py-3">
                  <div class="col-md-4"><img src="images/classmates/${item.funImg}" /></div>
                  <div class="col-md-8 pl-lg-4">
                    <h2 class="student-name mt-4 mt-md-0 h1">${item.firstName} ${item.lastName}</h2>
                    <p>${item.bio}</p>
                  `
                    studentInfo += studentContact
                    studentInfo += `
                  </div>
                </div><!--end .row -->
                </div><!--end .container-->
              </div><!--end .modal-body-->
          </div >
        </div >
      </div > `;
    } else {
      studentInfo += `
      </div>
        </div>
        `
    }
    document.getElementById("cohort").innerHTML += studentInfo;

  });
};


$.ajax({
  url: "data/techs.json"
}).done(techs)
  .fail(function (error) {
    console.log("error", error);
  });

function techs(list) {
  let data = list.techs;
  data.forEach(function (item) {
    document.getElementById("techs").innerHTML +=
      `<div class="col-sm-2 technologies">
         <center><a href="${item.link}" target="_blank"><img class="techs" src="images/techs/${item.image}" alt="${item.name}" data-toggle="tooltip" data-placement="top" title="${item.name}"></a><br>
         </center>
      </div>`;
  });
};
