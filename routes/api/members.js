const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

// Get all members
router.get('/', (req, res) => {
    res.json(members);
});


// Get specific member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updatedMember = members.filter(member => member.id === parseInt(req.params.id));
        res.json(updatedMember);
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }        
});

// Delete specific member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json({ 
            msg: `Member with the id of ${req.params.id} has been deleted`,
            members: members.filter(member => member.id !== parseInt(req.params.id)) });        
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }        
});

// Update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updatedMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updatedMember.name ? updatedMember.name : member.name;
                member.email = updatedMember.email ? updatedMember.email : member.email;
            }

            res.json({ msg: 'Member updated', member });
        });
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});
    
// Create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email' });
    }

    members.push(newMember);

    res.json(members);
    //res.redirect('/');
});  



module.exports = router;