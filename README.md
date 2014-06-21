![jQuery Survey Plugin](https://github.com/codeATbusiness/jquery-survey/raw/master/src/plugin-images/jquery-survey-780x80.png "jQuery Survey Plugin")

###Introduction
This jQuery Plugin allows you to make custom survey forms in several ways using some options properties.
You can load some survey items fom custom **ARRAY** data, **JSON** files or using **AJAX** request to a database (_right now only Array data is available_).

![Sample of the jQuery Survey Plugin](https://github.com/codeATbusiness/jquery-survey/raw/master/src/plugin-images/sample-survey.jpg "Sample of the jQuery Survey Plugin")
###Requirements
   + [jQuery](https://jquery.com)
   + [Twitter Bootstrap 3.X](http://getbootstrap.com)

    These two requirements was linked to the index.php demo project using their CDN links. You may use this links or your local files.

###Usage of the jQuery Survey Plugin
1. Download all repository content to your computer or download the main files within the `dist` folder (see Step 2)
2. Download the **jQuery Survey Plugin** from one of the two following URLs:
[jQuery Survey](https://github.com/codeATbusiness/jquery-survey/dist/jquery.survey.js) or the [jQuery Survey minified version](https://github.com/codeATbusiness/jquery-survey/dist/jquery.survey.min.js)
3. If you choose the Step 1 you can find a `demo` folder within the structure where you can find some demo files that shows you how use the *jQuery Survey Plugin*. If you
choose to download the `jquery.survey.js` or `jquery.survey.min.js` file you can create your custom site (don't forget get the stylesheets and link in your HTML code to Twitter Bootstrap and JQuery files).
4. With your `jquery.survey.js` (or the minified version) you can add to your demo working file as follow:

   ```
   <script src="../jquery-survey/jquery.survey.js"></script>
   ```

5. The **jQuery Survey Plugin** has many ways of use as we can find in the next section but the basic usage needs you give some options to put it works as the questions source:

   ```javascript
    $("#id-selector").survey({
                    id: "1", //needed to reference your survey item
                    title: { //Title customization items
                        text: "First Custom Survey Title",
                        position: "left",
                        class: "custom-title-style" //You can modify it
                    },
                    source: { //The first basic structure of Survey Questions
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
                    optionsNumber: 8, //Number of options you can check
                    footer: true //Do you want to show a Total footer?
                });
   ```

6. The custom options that you can input in the **JSON custom options object** are the following:
   <table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
      <th>Sample Value</th>
    </tr>
</thead>
<tbody>
    <tr>
      <td><strong>id</strong></td>
      <td>Id of the Survey</td>
      <td>1,2,3, ... N</td>
    </tr>
    <tr>
      <td><strong>Title</strong></td>
      <td>Title of the Survey</td>
      <td><pre>title:{
      text:"json",
      position: "left|center|right",
      class: "your-custom-title-class-in-css"
}</pre></td>
    </tr>
    <tr>
      <td><strong>source</strong></td>
       <td>A JSON object with type and url values</td>
          <td><pre>source:{
      type:"json",
      data: "../sourcejsonfile.php"
    }</pre></td>
    </tr>
    <tr>
      <td><strong>optionsNumber</strong></td>
      <td>Number of options you can check</td>
      <td>10</td>
    </tr>
    <tr>
      <td><strong>questionTitle</strong></td>
      <td>The title of the Survey Question Group</td>
      <td>Questions</td>
    </tr>
    <tr>
      <td><strong>Footer</strong></td>
      <td>A boolean value if you want to show Totals</td>
      <td><pre>true | false</pre></td>
    </tr>
  </tbody>
   </table>
7. If you load a first survey you may view all options are resets to max value. You need to change each question value.
8. When you are changing your survey it updates the Total Survey values on the fly. You may get this totals as an array using the ``toArray()`` method of the plugin as follow:

    ```javascript
       //This function return an array of values that you can use as you need.
       $('#custom-survey').survey('toArray'); 
    ```
9. If you want to do anything when you are updating your custom Survey you may use the **onSurveyChange** callback function as follow:
    
    ```javascript
       //... more Survey options
       onSurveyChange: function(){
           console.log('Survey updated!');
       }
       //... more Survey options 
    ```
10. Soon you will be able to work with more full datasource options and full survey data (questions groups, ...)

###Source data format
1. **Inline Array**
   
    At this moment the only way for create custom a custom survey. You only need to add to the options when you configure it as follow:

    ```javascript
   source: {
      type: "array",
      data: [
          "Your first question",
          "Your second question",
          "Another question",
          "N... question"
      ]
   }
    ``` 

2. **Array** [Soon]
   ```php
   $survey = array(
    0 => array(
        "groupTitle" => "First Group",
        "questions" => array(
            "First question",
            "Second question",
            "Third question",
            "Fourth question",
            "Fifth question",
            "Sixth question",
            "Seventh question",
            "Eighth question",
            "Ninth question",
            "Tenth question",
        ),
        "optionsNumber" => 10
    ),
    1 => array(
        "groupTitle" => "Second Group",
        "questions" => array(
            "First question",
            "Second question",
            "Third question",
            "Fourth question",
            "Fifth question"
        ),
        "optionsNumber" => 5
    )
);
   ```
3. **JSON** [Soon]
   
    ```php
    $questions = array(
        0 => array(
            "groupTitle" => "First Group",
            "questions" => array(
                "First question",
                "Second question",
                "Third question",
                "Fourth question",
                "Fifth question",
                "Sixth question",
                "Seventh question",
                "Eighth question",
                "Ninth question",
                "Tenth question",
            ),
            "optionsNumber" => 10
        ),
        1 => array(
            "groupTitle" => "Second Group",
            "questions" => array(
                "First question",
                "Second question",
                "Third question",
                "Fourth question",
                "Fifth question"
            ),
            "optionsNumber" => 5
        )
    );

    echo json_encode($questions);
    ```

4. **Ajax Requests**
   ```
   Soon using a URI via jQuery Ajax Request
   ```