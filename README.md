## USER STORIES AS A USER

MVP

    I want  see the list of the campsite locations
    I want search for locations using a search bar (postcode, county, etc)
    I want to see a details of the selected campsites (response from api)

Implemented Features

    I want to view a map of campsites nearby my location
    I want to see the nearest pub, supermarket etc
    I want also to see point of interests near by location of the selected campsite
    I want to able to sign up and create a profile and login

Extra features

    I want to adjust my search range
    I want to see how to get there
    I want to know if I can to go for a walk
    I want to interact with campsite owner
    I want to check availability
    I want to make a booking
    After my stay I want to leave a review and rating

## USER STORIES AS CAMPSITE OWNER

Implemented features

    I want to able to sign up and create a profile and login

Extra features

    I want to access owner portal
    I want to be able register as my campsite
    I want to be able to send proof of my identity and address
    I want to add extra informations to campsite details
    I want to reply to reviews
    I want to see any bookings
    I want to confirm or reject any booking
    I want to interact with camper

This is the link to figma wireframe of the Pitch Perfect app
https://www.figma.com/file/CyYohY0SHJsbDPfvsJaQs9/Goose-camping?node-id=0%3A1

# APIs

## /users

```
    GET /users/:user_id
    exampleResponse
    {
        user: {
            username,
            camping_history: [{date, campsite_name, votes}]
        }
    }


    POST /users
    examplePostBody
    {
        username,
        password,
        firstname,
        lastname
    }
    exampleResponse
    {
        user: {
            username
        }
    }
```

## /reviews

```
    GET /reviews/:place_id
    exampleResponse
    {
        reviews: [{username, review}]
    }

    POST /reviews/:place_id
    examplePostBody
    {
        username,
        campsite_name,
        review,
        created_at
    }
    exampleResponse
    {
        review: {username, review, created_at}
    }

    DELETE /reviews/:place_id
    example post body
    {
        username,
        review_id
    }
```

## /camping_history

```
    POST /camping_history
    examplePostBody
    {
        username,
        date,
        place_id,
        votes
    }
    exampleResponse
    {
        camping_history: {
            username,
            date,
            campsite_name,
            votes
        }
    }
```

## /campsites

```
    PATCH /campsites/:place_id
    examplePostBody
    {
        place_id,
        votes
    }

    {
        votes: {votes}
    }

    GET /campsites/:place_id
    exampleResponse
    {
        campsite: {
            campsite_name,
            owner_name,
            campsite_address,
            booked_dates,
            votes,
        }
    }

    GET /owner_username/campsites
    exampleResponse
    {
        owner_username,
        campsites: [{
            campsite_name,

            campsite_address,
            booked_dates,
            votes,
        }]
    }
```

## login

```
    POST /login
    examplePostBody
    {
        username,
        password,
        isUser
    }
    exampleResponse: status 200/404/400

```

## /owners

```

    GET /api/owners
    exampleResponse
    [{
        owner_username,
        firstname,
        lastname,
        avatar_url
    }]
```
