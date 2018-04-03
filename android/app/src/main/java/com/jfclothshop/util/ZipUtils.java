package com.jfclothshop.util;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class ZipUtils {
    private final static int BUFFER_SIZE = 1 << 12;
    public static void unzip(String zipFilePath, String destDirectory) throws Exception {
        File destDir = new File(destDirectory);
        if (destDir.exists()) {
            destDir.delete();
        }
        destDir.mkdir();
        ZipInputStream zipInputStream = new ZipInputStream(new FileInputStream(zipFilePath));
        ZipEntry zipEntry = zipInputStream.getNextEntry();
        while (zipEntry != null) {
            String filePath = destDirectory + File.separator + zipEntry.getName();
            if (!zipEntry.isDirectory()) {
                extractFiles(zipInputStream, filePath);
            } else {
                File dir = new File(filePath);
                dir.mkdir();
            }
            zipInputStream.closeEntry();
            zipEntry = zipInputStream.getNextEntry();
        }
        zipInputStream.close();
    }

    private static void extractFiles(ZipInputStream inputStream, String path) throws IOException {
        BufferedOutputStream outputStream = new BufferedOutputStream(new FileOutputStream(path));
        byte[] bytes = new byte[BUFFER_SIZE];
        int read = 0;
        while ((read = inputStream.read(bytes)) != -1) {
            outputStream.write(bytes, 0, read);
        }

        outputStream.close();
    }
}