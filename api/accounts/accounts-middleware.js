const db = require('./accounts-model')


exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)

/* 
  If the trimmed name is shorter than 3 or longer than 100, return { message: "name of account must be between 3 and 100" }
  If budget is not able to be converted into a number, return { message: "budget of account must be a number" }
  If budget is a negative number or over one million, return { message: "budget of account is too large or too small" }
*/



  const account = req.body
  // const isValid = account?.name && account?.budget
  const isValid = 'name' in account && 'budget' in account 
  // console.log('account.budget', account.budget)
  if(!isValid){ res.status(400).json({ message: "name and budget are required" }); return; }

  // && account.name && account.budget
  const name = account.name ? account.name.trim() : ''
  let budget = account.budget ? account.budget : ''
  budget =  Number.isNaN(budget) ? budget : Number(budget)
  console.log('\nbudget', budget)
  // console.log('typeof budget', typeof budget)
  const hasinvalidName = name.length < 3 || name.length > 100
  const hasInvalidBudget = Number.isNaN(budget) //typeof budget === 'string'  // Number.isNaN(budget) //  !Number.isInteger(budget) // typeof budget === 'string' 
  // console.log('hasInvalidBudget', hasInvalidBudget)
  const isBudgetOutofRange = budget < 0 || budget > 1000000 
  const isOk = !hasinvalidName && !hasInvalidBudget && !isBudgetOutofRange 
  
  if(hasinvalidName){ res.status(400).json({ message: "name of account must be between 3 and 100"}); return; }
  if(hasInvalidBudget){ res.status(400).json({ message: "budget of account must be a number" }); return; }
  if(isBudgetOutofRange){ res.status(400).json({ message: "budget of account is too large or too small" }); return;}
  if(isOk){ req.account = { name, budget }; next() }

  // if(hasinvalidName) { res.status(400).json({ message: "name of account must be between 3 and 100"}); return; }
  // if(hasInvalidBudget) { res.status(400).json({ message: "budget of account must be a number" }); return; }
  // if(isBudgetOutofRange) { res.status(400).json({ message: "budget of account is too large or too small" }); return; }
}


/* 
  checkAccountNameUnique returns a status 400 with a { message: "that name is taken" } 
  if the trimmed req.body.name already exists in the database
*/
  exports.checkAccountNameUnique = (req, res, next) => {
    const name = req.account.name
    db.getAccountNameById(name)
      .then(account => {
        if(account){
          res.status(400).json({message: "that name is taken" });
          return; 
        }else{
          next()
        }
      })
      .catch(err => {
        console.error('checkAccountId error ::', err )
        res.status(500).json({message:'The account information could not be saved/retrieved'})
      })
 
  }


  /* 
    checkAccountId returns a status 404 with a { message: "account not found" } if req.params.id does not exist in the database
  */
  exports.checkAccountId = (req, res, next) => {
    const id = req.params.id
    db.getById(id)
      .then(account => {
        if(account){
          req.account = account
          next()
        }else{
          res.status(404).json({message: "account not found" });
          return; 
        }
      })
      .catch(err => {
        console.error('checkAccountId error ::', err )
        res.status(500).json({message:'The account information could not be saved/retrieved'})
      })

  }
