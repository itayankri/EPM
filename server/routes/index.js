const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const eventsController = require('../controllers').events;
const usersController = require('../controllers').users;
const participationsController = require('../controllers').participations;
const campShopController = require('../controllers').campShop;
const blogController = require('../controllers').blog;
const purchaseController = require('../controllers').purchase;

module.exports = (app) => {
  // app.get('', (req, res) => res.status(200).send({
  //   message: 'Welcome to the Todos API!',
  // }));
                                            
  // ENTSE   E      N   SEVEN    E     E    NTSEVEN    EVEN  
  // E                  S        EV    E       E      S      
  // E        N    E    S        E E   E       E      S      
  // E        N    E    S        E E   E       E      S      
  // ENTSE     T  V     SEVEN    E  N  E       E        VE   
  // E         T  V     S        E     E       E          N  
  // E                  S        E   T E       E             
  // E          SE      S        E    SE       E          N  
  // ENTSE              SEVEN    E     E       E      SEVE   
                                                
  // EVENTS
  app.post('/event', eventsController.create); // create a new event
  app.get('/events', eventsController.list); // list all events by a filter (chapter/country/date range/type)
  app.get('/event/:eventId', eventsController.retrieve); // get a specific event, returns shitload of data
  app.put('/event/:eventId/edit', eventsController.update); // update an event information
  // BLOG
  app.get('/event/:eventId/blog'); // get the blog
  app.post('/event/:eventId/blog'); // create a blog post
  app.put('/event/:eventId/blog/:postId'); // update a blog post
  app.delete('/event/:eventId/blog/:postId'); // delete a blog post
  // GALLERY
  app.get('/event/:eventId/gallery'); // get the gallery
  app.post('/event/:eventId/gallery/uploadPhoto'); // upload a picture
  app.get('/event/:eventId/gallery/:photoId'); // view one picture
  app.delete('/event/:eventId/gallery/:photoId'); // delete a picture
  // LEADERS MEETINGS
  app.get('/event/:eventId/leadersMeetings'); // get the leaders meetings notes
  app.post('/event/:eventId/leadersMeetings/createNote'); // create a note
  app.get('/event/:eventId/leadersMeetings/:noteId'); // get a specific note
  app.post('/event/:eventId/leadersMeetings/:noteId'); // update a note
  app.delete('/event/:eventId/leadersMeetings/:noteId'); // delete a note
  // SHOPPING LIST
  app.get('/event/:eventId/shoppingList'); // get the shopping list
  app.post('/event/:eventId/shoppingList/addItem'); // create an item
  app.post('/event/:eventId/shoppingList/:itemId'); // update an item
  app.delete('/event/:eventId/shoppingList/:itemId'); // delete an item
  /* //TODO: IMPLEMENT FILES ??
  app.get('/event/:eventId/files') // get all the file names
  app.post('/event/:eventId/files') // upload a file
  app.get('/event/:eventId/files/:fileId') // download a file
  app.delete('/event/:eventId/files/:fileId') // delete a file
  */
  // Camp Shop
  app.get('/event/:eventId/campShop', campShopController.list); // Get all items
  app.post('/event/:eventId/campShop/addItem', campShopController.addItem); // Add an item
  app.post('/event/:eventId/campShop/pay'); // Pay for items
  app.get('/event/:eventId/campShop/purchases', purchaseController.getEventPurchases); // Get all items
  app.post('/event/:eventId/campShop/buy', purchaseController.purchaseItem); // "Buy" items
  app.post('/event/:eventId/campShop/return', purchaseController.returnItem); // "Buy" items
  app.put('/event/:eventId/campShop/:itemId'); // edit an item
  app.delete('/event/:eventId/campShop/:itemId'); // delete an item
  // TODO: maybe add a $$ money limit system / points limit system / item limit system?
  // other stuff in event
  app.post('/event/:eventId/generateForm', eventsController.generateForm); // TODO: Think about generate form
  app.put('/event/:eventId/claim', participationsController.claim); // claim a participation by a user
  app.put('/event/:eventId/unclaim', participationsController.unclaim); // unclaim a participation
  app.put('/event/:eventId/acceptParticipation', participationsController.acceptParticipation); // accept a participation
  app.put('/event/:eventId/declineParticipation', participationsController.declineParticipation); // decline a participation
  app.get('/event/:eventId/campSchedule'); // get a schedule for the camp
  app.get('/event/:eventId/chapterSchedule'); // get a schedule for the chapter
  app.get('/event/:eventId/indicators', eventsController.indicators); // get all the indicators for an event
  app.get('/event/:eventId/indicators/:userId/', eventsController.getEvidences); // get evidences for a specific user
  app.post('/event/:eventId/indicators/:userId/', eventsController.setEvidences); // set evidences for a specific user
  app.get('/event/:eventId/contactList', eventsController.contactList); // get the contact list
  app.get('/event/:eventId/participantsToRandomize', eventsController.participantsToRandomize); // get the participants before randomizing
  app.post('/event/:eventId/roomRandomizer', eventsController.roomRandomizer); // Randomize a given list of participants

  app.get('/event/:eventId/blogMessages', blogController.getEventMessages);
  app.post('/event/:eventId/blogMessages', blogController.postEventMessage);
  app.delete('/event/:evenId/blogMessages/:messageId', blogController.removeEventMessage);
  app.put('/event/:eventId/blogMessages/:messageId', blogController.updateEventMessage);




  app.post('/user', usersController.create);
  app.post('/login', usersController.login);
  app.get('/users', usersController.list);
  app.get('/user/:id', usersController.retrieve);
  app.put('/user/:id', usersController.update);
  app.get('/user', usersController.retrieveAuthenticated);

  
  app.post('/todos', todosController.create);
  app.get('/todos', todosController.list);
  app.get('/todos/:todoId', todosController.retrieve);
  app.put('/todos/:todoId', todosController.update);
  app.delete('/todos/:todoId', todosController.destroy);

  app.post('/todos/:todoId/items', todoItemsController.create);
  app.put('/todos/:todoId/items/:todoItemId', todoItemsController.update);
  app.delete(
    '/todos/:todoId/items/:todoItemId', todoItemsController.destroy
  );

  // For any other request method on todo items, we're going to return "Method Not Allowed"
  app.all('/todos/:todoId/items', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
  }));
};