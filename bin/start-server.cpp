#include <cstdlib>
#include <windows.h>  
#include <tchar.h>  
#include <assert.h>
const TCHAR szOperation[] = _T("open");  
const TCHAR szAddress[] = _T("http://localhost:3000/");  
int WINAPI WinMain(HINSTANCE hInst, HINSTANCE, LPSTR lpCmd, int nShow){
    HINSTANCE hRslt = ShellExecute(NULL, szOperation, szAddress, NULL, NULL, SW_SHOWNORMAL);
	system("supervisor www");
    assert(hRslt > (HINSTANCE)HINSTANCE_ERROR);
    return 0;  
}