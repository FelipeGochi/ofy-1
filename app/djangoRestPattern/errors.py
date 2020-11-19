from rest_framework.response import Response
from rest_framework import status


class APIExceptionDetail():
    def get(self, status, detail, code, severity, title):
        return Response(
            {
                "status_code": status,
                "detail": detail,
                "code": code,
                "severity": severity,
                "title": title
            },
            status=int(status)
        )

    def get_exception(self, status, exception):
        return self.get(
            status,
            exception['message'],
            exception['code'],
            exception['severity'],
            exception['title']
        )
