const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const{ isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated,(req, res)=>{
    res.render('notes/new-notes');
});

router.post('/notes/new-notes', isAuthenticated,async(req, res) =>{
   // console.log(req.body);
    const {TipoOferta}=req.body;
    const errors =[];
   
    if(!TipoOferta){
        errors.push({text: 'Escriba su estancia'});
    }
    if(errors.length > 0){
        res.render('notes/new-notes', {
            TipoOferta
        });
    }else{
        const newNote = new Note({TipoOferta });
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg','Tipo de oferta publicada correctamente');
        //console.log(newNote); 
        //ojo aqui ahmed, aqui podemos hacer el paripe de mandarlo a la web del proveedor y tal
        res.redirect('/notes');
    }
    
});

router.get('/notes', isAuthenticated,async(req, res) => {
    //res.send('Notes from database');
    //Aqui es donde haremos el fetch, de echo, lo hago?
    const notes = await Note.find({user: req.user.id}).lean().sort({date:'desc'});
    res.render('notes/all-notes', {notes});
});

router.delete('/notes/delete/:id',isAuthenticated, async(req,res) =>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Anuncio eliminado correctamente');
    //console.log(req.params.id);
    res.redirect('/notes');
});

module.exports =router;