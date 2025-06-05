export async function removeInncode() {
  let auth = localStorage.getItem('authorization');
  if (auth) {
    fetch(`https://api-dev01.elateral-dev.io/graphql`, {
        method: "POST",
        headers: {
            Authorization: JSON.parse(auth)['access_token'],
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
    mutation updateAccountModuleSettings($input: UpdateAccountModuleSettingsInput!) {
    updateAccountModuleSettings(input: $input) {
      accountModule {
        id
        moduleSettings {
          ... on FulfilmentDataCollectionModuleSettings {
            type {
              id
            }
            dataCollectionAttributeDefinitions {
              attributeDefinition {
                id
              }
              visibleToOwner
            }
          }
        }
        __typename
      }
      __typename
    }
    }
        `,
            variables: {
                "input": {
                    "id": "FULFILMENT_DATA_COLLECTION",
                    "aid": "dev01-temp",
                    "serviceId": "account-service",
                    "moduleSettings": {
                        "fulfilmentDataCollectionModuleSettings": {
                            "dataCollectionAttributeDefinitions": [],
                            "postProcessingScript": "async () => ({ dataCollection })"
                        }
                    }
                }
            }
        })
    })
        .then(r => r.json())
        .then(data => {
        console.log(data);
    });

  }
}
