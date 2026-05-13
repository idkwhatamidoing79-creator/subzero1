try {
    $url = 'https://corsproxy.io/?url=https://brave.com'
    $r = Invoke-WebRequest -Uri $url -UseBasicParsing -MaximumRedirection 5
    Write-Host "Status: $($r.StatusCode)"
    Write-Host "Final URL: $($r.BaseResponse.ResponseUri.AbsoluteUri)"
    $content = $r.Content
    if ($content.Length -gt 400) { $content = $content.Substring(0,400) }
    Write-Host "Content preview:"`n$content
} catch {
    Write-Host 'ERR:' $_.Exception.Message
}
