
export default (app, db, server) => {
  app.get('/api/close', (req, res) => {
    console.log('Closing server')
    db.connection.close()
    res.json({ result: 'Server closed' });
    server.close()
  });
}