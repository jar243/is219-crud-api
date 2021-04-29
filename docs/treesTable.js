$(document).ready(function () {
  $("#treeTable").DataTable({
    ajax: "http://localhost:8080/api/trees",
    columns: [
      { data: "index" },
      { data: "girth" },
      { data: "height" },
      { data: "volume" },
    ],
  })
})
