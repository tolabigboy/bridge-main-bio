$( document ).ready(function() {

    function requestFilteredJobListings(jobData) {

        let updatedCareersListContent = document.createDocumentFragment();

        for ( let category in jobData ) {
            if (jobData.hasOwnProperty(category)) {
                
                // Create and append the category title
                let h3 = document.createElement('h3');
                h3.className = 'careers__group-title';
                h3.textContent = category;
                updatedCareersListContent.appendChild(h3);

                // Iterate over each job in the category
                jobData[category].forEach(function(job) {
                    // Create and append the job listing
                    let link = document.createElement('a');
                    link.href = job.permalink;
                    link.className = 'careers__career';

                    let spanTitle = document.createElement('span');
                    spanTitle.className = 'career__position';
                    spanTitle.textContent = job.title;
                    link.appendChild(spanTitle);

                    link.appendChild(document.createElement('br'));

                    let spanLocation = document.createElement('span');
                    spanLocation.className = 'career__location';
                    spanLocation.textContent = job.location;
                    link.appendChild(spanLocation);

                    updatedCareersListContent.appendChild(link);
                });
            }
        }

        // get the container where the job listings will be placed, clear it, insert new data
        let careersList = document.querySelector('.careers__list');
        careersList.innerHTML = '';
        careersList.appendChild(updatedCareersListContent);
    };
    
    // Group By Filter
    $('#filter__group-by').on('change', function (e) {
        var optionSelected = $(this).val();
        if (optionSelected == 'department') {
            requestFilteredJobListings(JOBSDATA.jobs['department']);
        } else if (optionSelected == 'affiliate') {
            requestFilteredJobListings(JOBSDATA.jobs['affiliate']);
        } else if (optionSelected == 'location') {
            requestFilteredJobListings(JOBSDATA.jobs['location']);
        }
    });

    /***** Search *****/
    // Extend :contains to be case insensitive
    $.extend($.expr[":"], {
        "containsIN": function(elem, i, match, array) {
            return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });

    // Search input watch
    $('#filter__search').keyup(function(){
        // Search text
        let searchInput = $(this).val().toLowerCase();
        let allLocations = "Any Office Location";

        // Hide title on search and show when field is empty
        if (searchInput != '') {
        $('.careers__group-title').hide();
        } else {
        $('.careers__group-title').show();
        }

        // Hide all content class element
        $('.careers__career').hide();

        // Search and show
        $('.careers__career:containsIN("'+searchInput+'")').show();

        // Check if searched text is a location. If yes then also show jobs with location as 'any office location'
        let locationText = $('.careers__career .career__location:containsIN("'+searchInput+'")').text();
        if(locationText != '') {
            $('.careers__career:containsIN("'+allLocations+'")').show();
        }
    });

});