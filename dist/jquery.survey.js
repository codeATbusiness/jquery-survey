/*****************************************************************************************************
 * codeATBusiness | jQuery Survey Plugin 1.0.0
 *
 * Build custom Surveys based on JQuery and Twitter Bootstrap
 *
 * @author          codeATBusiness
 * @copyright       Copyright (c) 2014 codeATBusiness.
 * @license         This CodeATBusiness jQuery Survey Plugin is licensed under the MIT license 2014
 * @link            https://www.codeatbusiness.com
 * @github          https://github.com/codeATbusiness/jquery-survey
 * @version         1.0.0
 *
 *****************************************************************************************************/
;
(function($, window, document, undefined) {
    //Store of the plugin-name
    var pluginName = 'survey';

    //Constructor of the Plugin
    function Plugin(element, options) {
        // Reference to the source element
        this.el = element;
        // jQuery reference of the element
        this.$el = $(element);

        //Survey elements
        this.surveyTitle = null;
        this.tableHead = null;
        this.tableBody = null;
        this.tableFooter = null;

        // Options manage
        this.options = $.extend(true, {}, $.fn[pluginName].defaults, options);
        // Initialize the plugin instance
        this.init();
    }
    //Prototype Extension
    Plugin.prototype = {
        //Initialization code
        init: function() {
            //Create the survey
            this.$el.attr('data-survey', this.options.id);
            this.$el.prepend(this._buildTitle());
            var table = "<table class='table table-bordered table-condensed table-hover'>" + this._buildTableHead() + this._buildTableBody() + this._buildTableFooter() + "</table>";
            this.$el.append(table);
            this._resetSurvey();
            this._surveyChange();
            this._calculateTotals();
        },
        //Destroy method for free resources
        destroy: function() {

            // Remove any attached data from your plugin
            this.$el.removeData();
        },
        //For get the Totals Survey Footer
        toArray: function() {
            var totalArray = [];
            var totalItems = this.$el.find('tfoot td').filter('[data-type=total]');
            $(totalItems).each(function() {
                totalArray.push($(this).text());
            });
            return totalArray;
        },
        //Get the survey data
        _getSourceData: function() {
            var items = [];
            if (this.options.source) {
                //Evaluate if the especified sourceType is an Array
                if (this.options.source.type === "array") {
                    //Get the array located in the options.source.data property
                    if ($.isArray(this.options.source.data)) {
                        items = this.options.source.data;
                    }
                } else if (this.options.source.type === "json") {
                    //Get the JSON Object from the Source
                    //TODO: Not implemented right now.
                }
            }
            return items;
        },
        //Get the HTML formated title
        _buildTitle: function() {
            //If is set the Title options set the Survey 
            if (this.options.title !== undefined) {
                this.surveyTitle = "<h2 class='" + this.options.title.class + "' style='text-align:" + this.options.title.position + "'>" + this.options.title.text + "</h2>";
                return this.surveyTitle;
            }

        },
        //Get the HTML formated Survey Table Head
        _buildTableHead: function() {

            //Build the header of the Table
            this.tableHead = "";
            if (this.options.questionsTitle !== undefined) {
                this.tableHead += "<thead><tr><th>" + this.options.questionsTitle + "</th>";
            }

            if (this.options.optionsNumber !== undefined) {
                for (var i = 0; i < this.options.optionsNumber; i++) {
                    this.tableHead += "<th style='text-align:center;'>" + (i + 1) + "</th>";
                }
                this.tableHead += "</tr></thead>";
                return this.tableHead;
            }
        },
        //Get the HTML formated Survey Table Body
        _buildTableBody: function() {
            this.tableBody = "<tbody>";
            var optionsNumber = Number(this.options.optionsNumber);
            var sourceData = this._getSourceData();
            that = this;
            $.each(sourceData, function(k, v) {
                that.tableBody += "<tr><td>" + v + "</td>";
                for (var i = 0; i < optionsNumber; i++) {
                    that.tableBody += "<td style='text-align: center;'>" +
                            "<input type='radio' data-survey='" + that.options.id + "' data-question='" + (k + 1) + "' data-opt='" + (i + 1) + "'>" +
                            "</td>";
                }
                that.tableBody += "</tr>";
            });
            this.tableBody += "</tbody>";
            return this.tableBody;
        },
        //Get the HTML formated Survey Table Total Footer
        _buildTableFooter: function() {
            this.tableFooter = "";
            var optionsNumber = Number(this.options.optionsNumber);
            if (this.options.footer === undefined || this.options.footer !== false) {
                this.tableFooter += "<tfoot>";
                this.tableFooter += "<tr style='font-weight:bold;'><td style='text-align:right;'>Totals</td>";
                for (var i = 0; i < optionsNumber; i++) {
                    this.tableFooter += "<td data-survey='" + that.options.id + "' data-type='total' style='text-align:center;'>" + 0 + "</td>";
                }
                this.tableFooter += "</tfoot>";
            }

            return this.tableFooter;
        },
        //Reset your survey
        _resetSurvey: function() {
            var optionsNumber = Number(this.options.optionsNumber);
            var surveyToReset = this.$el.attr('data-survey');
            var resetItems = this.$el.find('input[type=radio]').filter('[data-survey=' + surveyToReset + ']');
            $(resetItems).each(function() {
                if ($(this).data('opt') === (optionsNumber)) {
                    $(this).attr('checked', 'checked');
                }
            });
        },
        //Control when your survey is updated
        _surveyChange: function() {
            var surveyToReset = this.$el.attr('data-survey');
            var radioChecks = this.$el.find('input[type=radio]');
            that = this;
            $(radioChecks).each(function() {
                $(this).on('click.' + pluginName, function() {
                    var index = $(this).data('opt');
                    var anotherItems = $(this).parents('tr').find('td input[type=radio]').filter('[data-survey=' + surveyToReset + ']').not('[data-opt=' + index + ']');
                    $(anotherItems).removeAttr('checked');
                    $(this).attr('checked', 'checked');
                    that._calculateTotals();
                    that.options.onSurveyChange.call(this);
                });
            });
        },
        //Set the Totals footer values
        _calculateTotals: function() {
            var surveyToReset = this.$el.attr('data-survey');
            var totalsTd = this.$el.find('td[data-type=total]').filter('[data-survey=' + surveyToReset + ']');
            that = this;
            $(totalsTd).each(function() {
                total = 0;
                index = $(this).index();
                var items = that.$el.filter('[data-survey=' + surveyToReset + ']').find('td:nth-child(' + (index + 1) + ')');
                total = $(items).find('input[type=radio]').filter(':checked').length;
                $(this).text(total);
            });
        }
    };

    //Plugin manage options
    $.fn[pluginName] = function(options) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function() {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            if (Array.prototype.slice.call(args, 1).length == 0 && $.inArray(options, $.fn[pluginName].getters) != -1) {
                var instance = $.data(this[0], 'plugin_' + pluginName);
                return instance[options].apply(instance, Array.prototype.slice.call(args, 1));
            } else {
                return this.each(function() {
                    var instance = $.data(this, 'plugin_' + pluginName);
                    if (instance instanceof Plugin && typeof instance[options] === 'function') {
                        instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                    }
                });
            }
        }
    };

    //Getter methods as an array
    $.fn[pluginName].getters = ['toArray']; //Here only expose one method "toArray" to get the total results

    /**
     * Default options
     */
    $.fn[pluginName].defaults = {
        id: "1",
        title: {
            text: "First Custom Survey",
            class: "surv-title-default",
            position: "center"
        },
        optionsNumber: 10,
        questionsTitle: "Questions",
        footer: false,
        onSurveyChange: function() {

        }
    }
    ;
})(jQuery, window, document);