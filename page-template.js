
module.exports = templateData => {
    // destructure page data by section
    const { projects, about, ...header } = templateData;
  
    return `
<!DOCTYPE html>
<html>
<head>
<title> Friend-Finder </title>
<script src ="C:\\\\\handlebars-v4.7.6.js"></script>
</head>
<body>

<div id="userData"></div>

<script type="text/javascript">

var userInfo = "<p> My name is {{name}}</p>";

var template = Handlebars.compile(userInfo);

var data = template({name: ""});

document.getElementById("userData").innerHTML += data;
</script>


</body>
</html> 
`;
};
