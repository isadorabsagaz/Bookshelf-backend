const PDFDocument = require("pdfkit");
const axios = require("axios");
const Bookshelf = require("../models/bookModel");

const generatePDF = async (req, res) => {
    try {
        const {id} = req.params;
        const books = await Bookshelf.findAll({
            where: {user_id: id},
            attributes: ['key', 'title', 'author_name', 'cover_i', 'first_publish_year']
        });

        if (!books || books.length === 0) {
            return res.status(404).json({message: "No books found for this user"});
        }

        const doc = new PDFDocument({margin: 30});

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=bookshelf.pdf");

        doc.pipe(res);

        doc.fontSize(20).text("Estante de livros", {align: "center"}).moveDown();

        for (const book of books) {
            doc.fontSize(14).text(`Título: ${book.title}`);
            doc.fontSize(12).text(`Autor: ${book.author_name}`);
            doc.text(`Ano de publicação: ${book.first_publish_year}`)

            if (book.cover_i) {
                const imageURL = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

                try {
                    const response = await axios.get(imageURL, {responseType: "arraybuffer"});
                    doc.image(response.data, {
                        fit: [100, 50],
                        align: "left",
                    });
                } catch (err) {
                    doc.text("(Erro ao carregar imagem da capa)");
                }
            }

            doc.moveDown(2);
        }
        doc.end();
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Erro ao gerar PDF", err: err.message});
    }
};

module.exports = {generatePDF};