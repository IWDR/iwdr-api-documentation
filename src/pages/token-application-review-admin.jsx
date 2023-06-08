/*
* Application review page for admins only
*/

import {DataTable} from "@/components/DataTable";
import {CreateApplicationReviewDialog} from "@/components/dialogs/CreateApplicationReviewDialog";

export async function getServerSideProps() {
    return {
        props: {
            title: 'API Application Review',
            description: 'Admin review of applications for API access.'
        },
    }
}

export default function TokenApplicationReview() {

    const headers = [
        {
            text: 'Project Leader',
            key: 'project_leader_name'
        },
        {
            text: 'Email',
            key: 'project_leader_email'
        },
        {
            text: 'Ideal Start Date',
            key: 'project_desired_start_date'
        },
        {
            text: 'Total # Dogs in DB',
            key: 'organization_total_dogs_to_import'
        },
        {
            text: 'Actions',
            component: (item) => (
              <CreateApplicationReviewDialog app={item}/>
            ),
        }
    ];

    return (
      <>
          <h1>API Application Review</h1>
          <DataTable
              path='/api/access-application'
              headers={headers}
          />
      </>
    );
}
