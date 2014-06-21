<!DOCTYPE html>
<html>
    <head>
        <title>jQuery Survey | Demo</title>
        <!--Load of Source Sans Pro Google Font-->
        <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic&subset=latin,latin-ext' rel='stylesheet' type='text/css'>       
        <!--Load of the CDN Bootstrap 3.1.1-->
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"/>
        <!--Change as you need to the new location: href="styles/main.css" -->
        <link rel="stylesheet" href="../src/styles/main.css"/>
        <!--Here is a custom sample theme for the CSS options classes-->
        <link rel="stylesheet" href="styles/custom-theme.css"/>
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-3"></div>
                <div class="col-xs-6">

                    <!--Here is the Custom Survey-->
                    <div id="custom-survey"></div>

                </div>
                <div class="col-xs-3"></div>
            </div>
        </div>


        <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
        <script src="../src/jquery.survey.js"></script>
        <script>
            //Try out of our new custom Survey Plugin
            $(document).on('ready', function() {
                $("#custom-survey").survey({
                    id: "1",
                    title: {
                        text: "My first custom Survey",
                        position: "left",
                        class: "surv-title-default"
                    },
                    source: {
                        type: "array",
                        data: [
                            "1. First cuestion of the sample Survey",
                            "2. Second cuestion of the sample Survey",
                            "3. Third cuestion of the sample Survey",
                            "4. Fourth cuestion of the sample Survey",
                            "5. Fifth cuestion of the sample Survey",
                            "6. Sixth cuestion of the sample Survey",
                            "7. Seventh cuestion of the sample Survey",
                            "8. Eighth cuestion of the sample Survey",
                            "9. Ninth cuestion of the sample Survey",
                            "10. Tenth cuestion of the sample Survey"
                        ]
                    },
                    optionsNumber: 8,
                    footer: true
                });
                
                //Getting the array of the Survey Results
                //console.log($('#custom-survey').survey('toArray'));

            });
        </script>
    </body>
</html>