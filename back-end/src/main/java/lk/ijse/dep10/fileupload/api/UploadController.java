package lk.ijse.dep10.fileupload.api;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/uploads")
@CrossOrigin
public class UploadController {

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public  void  saveImage(@RequestPart("image") Part image) throws IOException {
        var desktop = new File(System.getProperty("user.home"), "Desktop");
        var uploadDir = new File(desktop, "uploads");
        if (!uploadDir.exists()) uploadDir.mkdir();
        File imagePath = new File(uploadDir, image.getSubmittedFileName());
        image.write(imagePath.getAbsolutePath());

    }
}
