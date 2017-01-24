import { createSelector } from 'reselect';

export const selectDashboardPost = () => state => state.dashboardPost;

export const selectPostSectionFormSubmission = createSelector(
  selectDashboardPost(),
  dashboardPost => {
    const { name, fields } = dashboardPost.sectionLayoutForm;
    return {
      name: name.value,
      layout: fields.map((field, i) => 
        ({
          value: item.value,
          name: item.name
        })
      )
    };
  }
);

export const selectBoxLayoutFormSubmission = createSelector(
  selectDashboardPost(),
  dashboardPost => {
    return {};
  }
);
