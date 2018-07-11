package com.jfclothshop;

import android.app.Application;
import android.os.Environment;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.jfclothshop.util.Log;
import com.jfclothshop.util.Worker;
import com.jfclothshop.util.ZipUtils;

import java.io.File;
import java.util.Arrays;
import java.util.List;

public class JFClothShopApplication extends Application implements ReactApplication {
    private static final String TAG = JFClothShopApplication.class.getSimpleName();
    private String mBundleParentPath = null;
    private String mBundlePath = null;
    private String mBundleName = "index.android.bundle";
    private File mBundleFile = null;
    private Worker mWorker;

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return super.getJSMainModuleName();
        }

        @Override
        protected String getBundleAssetName() {
            String bundleName = "index.android.bundle";

            if (mBundleFile != null && mBundleFile.exists()) {
                Log.i(TAG, " getBundleAssetName jsBundle exist...");
                return null;
            }
            Log.i(TAG, " getBundleAssetName jsBundle not exist...");
            return bundleName;
        }

        //先回调执行
        @Override
        protected String getJSBundleFile() {
            if (mBundleFile != null && mBundleFile.exists()) {
                Log.i(TAG, " getJSBundleFile jsBundle exist...");
                return mBundleFile.getPath();
            }
            Log.i(TAG, " getJSBundleFile jsBundle not exist...");
            return null;
        }

    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {

        
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        mWorker = new Worker("JFClothShop_Worker");
        mBundleParentPath = getFilesDir() + "/jfClothShopBundle";
        mBundlePath = mBundleParentPath + File.separator + mBundleName;
        mBundleFile = new File(mBundlePath);

        Log.i(TAG, " JFClothShopApp onCreate " +
                "\n mBundleParentPath: " + mBundleParentPath +
                "\n mBundlePath: " + mBundlePath +
                "\n mBundleName: " + mBundleName +
                "\n mBundleFile: " + mBundleFile);
        final String zipFilePath = Environment.getExternalStorageDirectory().getAbsoluteFile() + "/jfClothShopBundle.zip";
        mWorker.runOnWorkerThread(new Runnable() {
            @Override
            public void run() {
                // TODO: 2018/4/3 后期要对接服务器进行以下几点的修改
                // （1）进行判断是否有新版本的bundle.zip包，有则进行下载
                // （2）被下载下来的zip包的名字，要根据服务器下发的进行
                File zipFile = new File(zipFilePath);
                Log.i(TAG, " JFClothShopApp onCreate zipFile.exists: " + zipFile.exists());
                if (zipFile.exists()) {
                    try {
                        ZipUtils.unzip(zipFilePath, mBundleParentPath);
                    } catch (Exception e) {
                        e.printStackTrace();
                        Log.e(TAG, " JFClothShopApp unZipFile error msg: " + e.getMessage());
                    } finally {
                        zipFile.delete();

                    }
                }
            }
        });
    }

}
