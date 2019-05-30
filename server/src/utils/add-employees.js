module.exports = async app => {
  let employees = [
    ['Leslie Knope', 'Parks & Recreation', 'Deputy Director'],
    ['Ron Swanson', 'Parks & Recreation', 'Director'],
    ['Tom Haverford', 'Parks & Recreation', 'Administrator'],
    ['April Ludgate', 'Parks & Recreation', "Director's Assistant"],
    ['Andy Dwyer', 'Parks & Recreation', 'Shoeshiner'],
    ['Ann Perkins', 'Health Department', 'Public Relations Director '],
    ['Jerry Gergich', 'Parks & Recreation', 'Office Manager'],
    ['Donna Meagle', 'Parks & Recreation', 'Permits Security'],
    ['Ben Wyatt', "City Manager's Office", 'Assistant City Manager'],
    ['Chris Traeger', "City Manager's Office", 'City Manager'],
    ['Mark Brendanawicz', 'City Planning', 'City Planner'],
    ['Craig Middlebrooks', 'Parks & Recreation', 'Associate Administrator'],
    ['Dave Sanderson', 'Police', 'Police Officer'],
    ["Li'l Sebastian", 'Parks & Recreation', 'Tiny Horse'],
    ['Marlene Griggs-Knope', 'School Council', 'School Councilwoman'],
    ['Bill Dexhart', 'City Council', 'City Councilman'],
    ['Carl Lorthner', 'Parks & Recreation', 'Park Ranger'],
    ['George Williams', 'Public Works', 'Maintenance Worker'],
    ['Douglass Howser', 'City Council', 'City Councilman'],
    ['Hugh Trumple', 'Police', 'Police Chief'],
    ['Jeremy Jamm', 'City Council', 'City Councilman'],
    ['Fielding Milton', 'City Council', 'City Councilman'],
    ['Joe Fantringham', 'Sewage', 'Director'],
    ['Kyle', "City Attorney's Office", 'Attorney'],
    ['Mayor Gunderson', "Mayor's Office", 'Mayor'],
    ['Paul Iaresco', "City Manager's Office", 'Former City Manager'],
    ['Scott Braddock', "City Attorney's Office", 'Attorney'],
    ['Ethel Beavers', "City Attorney's Office", 'Stenographer'],
    ['Harris Wittels', 'Animal Services', 'Co-Director'],
    ['Brett', 'Animal Services', 'Co-Director'],
    ['Brandi Maxxxx', 'City Council', 'City Councilwoman'],
    ['Ron Dunn', 'Parks & Recreation', 'Former Parks Director'],
    ['Tynnyfer', 'Parks & Recreation', "Director's Assistant"],
    ['Lindsay Carlisle Shay', 'Parks & Recreation', 'Deputy Director of Parks & Recreation'],
  ]

  const departmentService = app.service('departments')
  const userService = app.service('users')

  const ranRng = (min, max) => Math.floor(min + Math.random() * (max - min))
  const makeEmailFromName = name => name.toLowerCase().replace(/\s+/g, '.') + '@pawnee.gov'
  const makePhoneNumber = () => `(309) 765-5454 ext. ${ranRng(1000, 9999)}`
  const makeMailStop = () => `Building ${ranRng(1, 5)} - Stop ${ranRng(10, 20)}`

  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

  Promise.all(
    employees.map(async employee => {
      const [name, departmentName, title] = employee

      // Check to see if the department exists.
      let department = await departmentService.find({ query: { name: departmentName } })
      console.log(departmentName, department.total)
      if (!department.total) {
        department = await departmentService.create({ name: departmentName })
      } else {
        department = department.data[0]
      }

      const departmentRef = department._id

      return {
        name,
        email: makeEmailFromName(name),
        phone: makePhoneNumber(),
        mailStop: makeMailStop(),
        title,
        isActive: true,
        isAdmin: false,
        avatarURL: `/assets/images/avatars/${slugify(name)}.jpg`,
        departmentRef,
        password: 'meat-tornado',
      }
    })
  ).then(employees => userService.create(employees))
}
