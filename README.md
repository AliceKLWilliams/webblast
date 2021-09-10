# Web Blast

A custom WordPress theme for a fictional web workshop company.

## Issues

Currently in the process of registering the custom post types and their fields in the PHP, rather than via a plugin. This means the site may not work correctly while this is still in progress.

## Custom Post Types

- Events - Used to manage events held by the company
- Speakers - Used to manage the speakers that are a part of events
- Favourite - Used to manage the relationship between favourites and events
- Review - Used to manage the reviews for each event
- Timeline Event - Used to manage the events that appear on /about-us

## Required Pages
- About us (/about-us)
- Favourites (/favourites)
- Past Events (/past-events)
- Future Events (/future-events)

## Functionality

- Ability to favourite events and see these on the /favourites page
- Ability to review events
- Events split into past/current/future events pages based off their start and end date

## Theme Development

- ```npm install``` to install dependencies
- ```npx mix watch``` to watch files and compile assets when required
- ```npx mix``` to compile assets
- ```npx mix --production``` to compile assets for production

## Required Plugins

- [Advanced Custom Fields](https://www.advancedcustomfields.com/)