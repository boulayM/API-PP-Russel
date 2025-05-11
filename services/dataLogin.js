exports.date =  (res) => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString(); // Formats date and time based on user's locale
      return res.render('dataLogin', {formattedDateTime});
    }
